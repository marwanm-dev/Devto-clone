import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

const Social = ({ footer }) => {
    return (
        <Wrapper footer={footer}>
            <SocialLink to='//github.com/marwanm-dev' target='_blank' footer={footer}>
                <IconWrapper>
                    <AiFillGithub />
                </IconWrapper>
            </SocialLink>
            <SocialLink to='//www.instagram.com/marwan_mostafa24' target='_blank' footer={footer}>
                <IconWrapper>
                    <AiFillInstagram />
                </IconWrapper>
            </SocialLink>
            <SocialLink to='//www.linkedin.com/in/marwanm-dev' target='_blank' footer={footer}>
                <IconWrapper>
                    <AiFillLinkedin />
                </IconWrapper>
            </SocialLink>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${tw`py-3 flex [svg]:w-full [a]:w-full [&>*:first-child]:(rounded-tl-lg rounded-bl-lg) [&>*:last-child]:(rounded-tr-lg rounded-br-lg) hover:([&>*>*]:animate-bounce)`}
    ${({ footer }) => footer && tw`max-w-2xl mx-auto`}
`;

const IconWrapper = styled.div`
    ${tw`cursor-pointer w-full text-xl`};
`;

const SocialLink = styled(Link)`
    ${tw`w-full cursor-pointer flex justify-start text-center gap-2 text-black p-3`}
    ${({ footer }) =>
        footer ? tw`hover:(text-white bg-blue)` : tw`rounded-md hover:(text-blue bg-light-blue)`}
`;

export default Social;
