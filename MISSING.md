# Development Todos

_NEEDS FINISHING_

FAQ, About, Contact

Add new Notification types: likeComment and replyComment

Redirect to previous page he was on if refresh token expired and he was redirected to login and actually logged back

_NEEDS FIX_

On Production disable redux/react -devtools

Deletion of a reply (only) results in deleting the lowest one on that specific comment until refetch/refresh

Detection of what inputs changed on post edit (do not reupload the same image!)

Flash on Saving a post (in PostsList)

Refetching on receiving a notification from socket.io with a 1 sec delay setTimeout do without (STANDBY)

Made a socket context instead of redux slice (STANDBY)

OnEdit dashboard displays EditPost page before loading post (STANDBY)

I built a DEV.to clone from scratch!🎊🎺

# [Live Site](https://youtube.com)

# Tech

- UI: React
- Routing: React Router
- Real-time Notifications: Socket.io
- Backend: Express
- Database: MongoDB
- ORM: Mongoose
- Image hosting: Cloudinary

# Features

- Login / Signup
- Google Oauth
- Create / Remove / Update / Delete Post
- Like / Unicorn / Bookmark Post
- Reading List
- Create / Add Tags to Post
- Follow Tags
- Find Posts by Tags
- Comment / Replies
- Like Comment
- Edit / Delete Comment
- View Profile
- Edit Profile
- Follow User
- Search Posts
- Real-time Notifications

```javascript
// function that adds "2 numbers" together
const sumTwoNumbers = (num1, num2) => num1 + num2;

// call the function
console.log(sumTwoNumbers(1, 2)); // 3

// array of users
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 28 },
  { name: 'Bob', age: 25 },
];

// print out the users age
console.log(users.map(user => user.age)); // [30, 28, 25]
```
