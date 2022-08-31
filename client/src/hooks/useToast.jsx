import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tw, { styled } from 'twin.macro';
import Toast from '../common/Toast/Toast';
import { createPostUrl } from '../helpers/string';

const useToast = () => {
  let message;
  let url;

  const createToast = ({ sender, receiverUsername, type, reactionType, post }) => {
    if (type === 'follow') {
      message = `${sender.name} started following you.`;
      url = `/${sender.username}`;
    } else if (type === 'post') {
      message = `${sender.name} published a new post.`;
      url = `/${sender.username}/${createPostUrl(post.title, post.id)}`;
    } else if (type === 'comment') {
      message = `${sender.name} commented on your post.`;
      url = `/${receiverUsername}/${createPostUrl(post.title, post.id)}`;
    } else if (type === 'react') {
      message = `${sender.name} ${reactionType}${
        reactionType.indexOf('e') === reactionType.length - 1 ? 'd' : 'ed'
      } your post`;
      url = `/${receiverUsername}/${createPostUrl(post.title, post.id)}`;
    }

    toast(
      <Toast
        senderUsername={sender.username}
        message={message}
        picture={sender.picture.url}
        reactionType={reactionType}
        url={url}
      />
    );
  };

  return createToast;
};

export default useToast;
