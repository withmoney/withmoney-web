import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/Header';
import Img from 'components/Img';
import Flex from 'components/Flex';
import ButtonLink from 'components/ButtonLink';
import LoadingData from 'components/LoadingData';
import Text from 'components/Text';
import { Page, PageHeader, PageBody } from 'style/SubPages.style';
import { useUser } from 'hooks/useUser';

const Profile = () => {
  const { data, getDefaultImage } = useUser();

  return (
    <Page>
      <PageHeader>
        <Header margin="auto" as="h3">
          Profile
        </Header>
      </PageHeader>
      <PageBody>
        <Flex justifyContent="center">
          <Content>
            <ImgContent>
              {getDefaultImage ? (
                <Img size="170px" borderRadius="50%" src={getDefaultImage()} />
              ) : (
                <LoadingData size="170px" />
              )}
            </ImgContent>
            <TextContent>
              <Text
                bold
                align="center"
                font="lg"
              >{`${data?.me.firstName} ${data?.me.lastName}`}</Text>
              <Text align="center">{`${data?.me.email}`}</Text>
            </TextContent>
            <ButtonContent>
              <ButtonLink to="/profile-update"> Update Profile</ButtonLink>
              <ButtonLink to="/profile-change-password">Change Password</ButtonLink>
            </ButtonContent>
          </Content>
        </Flex>
      </PageBody>
    </Page>
  );
};

const Content = styled.div`
  display: block;
`;

const TextContent = styled.div`
  margin-bottom: 24px;
`;

const ImgContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  ${ButtonLink} {
    width: 175px;
    margin-right: 15px;
  }
`;

export default Profile;
