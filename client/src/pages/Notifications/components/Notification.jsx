import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { createPostUrl, getPostParams } from '../../../helpers/string';

const Notification = ({ notification: { type, sender, receiver, post, comment } }) => {
    const navigate = useNavigate();
    const { encodedTitle, encodedId } = getPostParams(`${post.title}-${post.id}`);
    const postUrl = createPostUrl(encodedTitle, encodedId);
    return (
        sender &&
        receiver && (
            <Wrapper>
                <Avatar src={sender.picture.url} onClick={() => navigate(`/${sender.username}`)} />
                <Desc>
                    {type === 'like' && post ? (
                        <>
                            <Bold onClick={() => navigate(`/${sender.username}`)}>
                                {sender.name}
                            </Bold>{' '}
                            reacted to your post{' '}
                            <Bold onClick={() => navigate(`/${receiver.username}/${postUrl}`)}>
                                {post.title}
                            </Bold>
                        </>
                    ) : type === 'comment' && post ? (
                        <>
                            <Bold onClick={() => navigate(`/${sender.username}`)}>
                                {sender.name}
                            </Bold>{' '}
                            commented on your post with {comment?.body} on
                            <Bold onClick={() => navigate(`/${receiver.username}/${postUrl}`)}>
                                {' ' + post.title}
                            </Bold>
                        </>
                    ) : type === 'follow' ? (
                        <>
                            <Bold onClick={() => navigate(`/${sender.username}`)}>
                                {sender.name}
                            </Bold>{' '}
                            followed you
                        </>
                    ) : (
                        post && (
                            <>
                                <Bold onClick={() => navigate(`/${sender.username}`)}>
                                    {sender.name}
                                </Bold>{' '}
                                published a new post{' '}
                                <Bold onClick={() => navigate(`/${sender.username}/${postUrl}`)}>
                                    {post.title}
                                </Bold>
                            </>
                        )
                    )}
                </Desc>
            </Wrapper>
        )
    );
};

const Desc = tw.div``;

const Avatar = tw.img`inline mr-sm cursor-pointer w-16 h-16 rounded-full`;

const Bold = tw.h3`cursor-pointer inline font-bold hover:(underline text-blue)`;

const Wrapper = tw.div`w-full flex items-center px-md py-sm bg-white border border-light-gray rounded-md`;

export default Notification;
