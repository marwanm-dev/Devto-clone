import { nanoid } from '@reduxjs/toolkit';
import tw, { styled } from 'twin.macro';

const Following = ({ following, navigate }) => {
  return (
    <Wrapper>
      {following.map(user => (
        <User key={nanoid()} onClick={() => navigate(`/${user.username}`)}>
          <Picture src={user.picture.url} />
          <Info>
            <Username>{user.username}</Username>
            <Email>@{user.email.slice(0, user.email.indexOf('@'))}</Email>
          </Info>
        </User>
      ))}
    </Wrapper>
  );
};

const Wrapper = tw.div`flex gap-2 flex-wrap`;

const User = tw.div`flex-[1 0 30%] min-w-[250px] max-w-[300px] flex flex-col gap-sm items-center p-md rounded-md border border-light-gray`;

const Picture = tw.img`w-16 h-16 rounded-full cursor-pointer`;

const Info = tw.div``;

const Username = tw.h3`text-blue cursor-pointer`;

const Email = tw.h4`text-light-gray cursor-pointer hover:text-gray`;

export default Following;
