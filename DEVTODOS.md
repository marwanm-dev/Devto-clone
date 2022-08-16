# Development Todos

_NEEDS FINISHING_

Dashboard

Notifications system (front/back(socket.io + schema + controller))

Auth0 Authentication

_NEEDS FIX_

Reply deletion results in deletion of another only until refresh

Detection of what inputs changed on post edit (do not reupload the same image!)

_STANDBY SOLUTIONS_

Redirect to previous page he was on if refresh token expired and he was redirected to login and actually logged back

See wtf is this
works => useGetPostsQuery([null], { refetchOnMountOrArgChange: true })
doesn't work => useGetPostsQuery([], { refetchOnMountOrArgChange: true })
neither this => useGetPostsQuery((null || undefined), { refetchOnMountOrArgChange: true })
