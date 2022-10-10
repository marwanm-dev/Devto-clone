import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../common/Toast/Toast';
import { createPostUrl, getPostParams } from '../helpers/string';

const useToast = () => {
    let message, url;
    const createToast = ({ sender, receiverUsername, type, reactionType, post }) => {
        const { encodedTitle, encodedId } = getPostParams(`${post.title}-${post.id}`);
        const postUrl = createPostUrl(encodedTitle, encodedId);
        if (type === 'follow') {
            message = `${sender.name} started following you.`;
            url = `/${sender.username}`;
        } else if (type === 'post') {
            message = `${sender.name} published a new post.`;
            url = `/${sender.username}/${postUrl}`;
        } else if (type === 'comment') {
            message = `${sender.name} commented on your post.`;
            url = `/${receiverUsername}/${postUrl}`;
        } else if (type === 'react') {
            message = `${sender.name} ${reactionType}${
                reactionType.indexOf('e') === reactionType.length - 1 ? 'd' : 'ed'
            } your post`;
            url = `/${receiverUsername}/${postUrl}`;
        }

        if (!toast.isActive(message)) {
            toast(
                <Toast
                    senderUsername={sender.username}
                    message={message}
                    picture={sender.picture.url}
                    reactionType={reactionType}
                    url={url}
                />,
                { toastId: message }
            );
        }
    };

    return createToast;
};

export default useToast;
