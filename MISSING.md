# Development Todos

_NEEDS FINISHING_

Auth0 Authentication (made without auth0) make it with

Search queries must be from server to search and filter posts, tags, users and limiting them (Search page)

FAQ, About, Contact

Redirect to previous page he was on if refresh token expired and he was redirected to login and actually logged back

_NEEDS FIX_

Detection of what inputs changed on post edit (do not reupload the same image!)
On google login, when edit profile if same image it gets uploaded

On google login, profile doesn't appear (name fix.. make it useGetUser not useGetOneUser)

unreadNotifications/followingTags fetches automatically even if isAuthed = false

Refetching on receiving a notification from socket.io but with a 1 sec delay setTimeout (do without setTimeout), do likeComment and replyComment

.ENV variables on client side

Made a socket context instead of redux slice (STANDBY)

OnEdit dashboard displays EditPost page before loading post (STANDBY)

Flash on Saving a post (in PostsList)

deletion of a reply (only) results in deleting the lowest one on that comment until refresh
