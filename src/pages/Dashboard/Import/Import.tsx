import Page from 'components/Page';
import { PageBodyColumns, PageHeader } from '../style/SubPages.style';
import Header from 'components/Header';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { useSearchCategoryLazyQuery } from 'graphql-service/hooks';
import { SortOrder, TransactionType } from 'graphql-service/types';

type ImportProps = {
  id: string;
  name: string;
  category: string;
  paymentMethod: string;
  price: number;
  paidAt: string;
};

export const Import = () => {
  const [data, setData] = useState<ImportProps[]>([]);

  const [searchCategory] = useSearchCategoryLazyQuery();

  useEffect(() => {
    const processCategoryImport = async () => {
      const first = data[0];

      if (first) {
        const { data: categoryData } = await searchCategory({
          variables: {
            where: {
              name: {
                equals: first.category,
              },
              type: {
                equals: TransactionType.Expense,
              },
              deletedAt: {
                equals: null,
              },
            },
            orderBy: [{ name: SortOrder.Asc }],
            skip: 0,
            take: 1,
          },
        });

        const result = categoryData?.findManyCategory.data;

        if (result?.length) {
          console.log('Category found:', result[0]);
        } else {
          console.log('Category not found:', first.category);
        }
      }
    };

    processCategoryImport();
    // console.log(data);
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem('file') as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          try {
            const jsonData: ImportProps[] = JSON.parse(event.target.result as string);
            setData(jsonData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <Page>
      <PageHeader>
        <Header margin="0" as="h3">
          Import
        </Header>
      </PageHeader>
      <PageBodyColumns>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" accept=".json" />
            <Button type="submit">Import</Button>
          </form>
        </div>
      </PageBodyColumns>
    </Page>
  );
};
