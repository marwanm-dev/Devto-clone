# Development Todos

_NEEDS FINISHING_

Redirect to previous page he was on if refresh token expired and he was redirected to login and actually logged back

Users/Tags follow and unFollow (front/back(controller))

Notifications system (front/back(socket.io + schema + controller))

Auth0 Authentication

_NEEDS FIX_

Post sorting system sorts by clock only (solution => maybe save timestamps instead of formatted date in database)

Reply deletion results in deletion of another only until refresh

_STANDBY SOLUTIONS_

See wtf is this
works => useGetPostsQuery([null], { refetchOnMountOrArgChange: true })
doesn't work => useGetPostsQuery([], { refetchOnMountOrArgChange: true })
neither this => useGetPostsQuery((null || undefined), { refetchOnMountOrArgChange: true })
