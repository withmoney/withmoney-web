import React, { useState } from 'react';
import { TrashFill, PencilFill } from '@styled-icons/bootstrap';
import { toast } from 'react-toastify';
import Header from '../../../components/Header';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import { Page, PageHeader } from '../style/SubPages.style';
import { Row, Cell, PageBodyColumns, PageBody } from '../style/SubPages.style';
import { useCategories } from '../../../hooks/useCategories';
import { useDeleteCategory, useRestoreCategory } from '../../../hooks/useCategories';
import LoadingData from '../../../components/LoadingData';
import Button from '../../../components/Button';
import ButtonLink from '../../../components/ButtonLink';
import ConfirmModal from '../../../modals/ConfirmModal';
import { Category } from '../../../models';
import Pagination from '../../../components/Pagination';

const initialValues = {
  filterName: '',
};

const ItemsPerPage = 5;

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState(initialValues);
  const { data, loading, refetch } = useCategories({
    variables: { name: filter.filterName, skip: currentPage * ItemsPerPage, take: ItemsPerPage },
    fetchPolicy: 'network-only',
  });

  const { deleteCategory, loading: loadingDelete } = useDeleteCategory();
  const { restoreCategory } = useRestoreCategory();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const handleChangeFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentPage(0);
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleDelete = async () => {
    try {
      await deleteCategory({ variables: { id: selectedCategory?.id } });
      setOpenModal(false);
      toast.error('Category deleted. Click here to restore!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 10000,
        draggable: false,
        onClick: handleRestoreCategory,
      });
      await refetch();
      setCurrentPage(0);
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
    }
  };

  const handleRestoreCategory = async () => {
    try {
      await restoreCategory({ variables: { id: selectedCategory?.id } });
      toast.success('Category has been successfully restored!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 8000,
        draggable: false,
      });
      await refetch();
    } catch (err) {
      toast.error(err.message, { position: toast.POSITION.BOTTOM_LEFT, draggable: false });
    }
  };

  const toggleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  return (
    <Page>
      <ConfirmModal
        onConfirm={handleDelete}
        setIsOpenModal={setOpenModal}
        isOpenModal={openModal}
        loading={loadingDelete}
        confirmButton="danger"
        label="Are you sure that you want to delete this category?"
      />
      <PageHeader>
        <Header margin="0" as="h3">
          Categories
        </Header>
        <ButtonLink type="button" to="/category-new" variation="primary">
          Add new
        </ButtonLink>
      </PageHeader>
      <PageBody>
        <Input
          name="filterName"
          type="text"
          onChange={handleChangeFilter}
          value={filter.filterName}
          placeholder="Filter category"
        />
      </PageBody>
      <PageBodyColumns>
        <Row>
          <Cell>
            <Text>Name</Text>
          </Cell>
          <Cell>
            <Text>Type</Text>
          </Cell>
          <Cell>
            <Text>Action</Text>
          </Cell>
        </Row>
        {loading ? (
          <LoadingData repeat={ItemsPerPage} />
        ) : (
          data?.categories.data &&
          data.categories.data.map((category: Category) => {
            return (
              <Row key={category.id}>
                <Cell>
                  <Text>{category.name}</Text>
                </Cell>
                <Cell>
                  <Text>{category.type}</Text>
                </Cell>
                <Cell>
                  <ButtonLink
                    style={{ marginRight: '10px' }}
                    to={`/category-edit/` + category.id}
                    variation="primary"
                  >
                    <PencilFill />
                  </ButtonLink>
                  <Button
                    onClick={() => toggleDeleteCategory(category)}
                    type="button"
                    variation="danger"
                  >
                    <TrashFill />
                  </Button>
                </Cell>
              </Row>
            );
          })
        )}
      </PageBodyColumns>
      {data?.categories.data && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={ItemsPerPage}
          totalItems={data.categories.pagination.totalItems}
        />
      )}
    </Page>
  );
};

export default Categories;
