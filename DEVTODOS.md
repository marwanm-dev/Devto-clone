# Development Todos

_NEEDS FINISHING_

Notifications system (front/back(socket.io + schema + controller)) => New skill so on emitting an event console log what should happen plan everything out first

Auth0 Authentication

_NEEDS FIX_

Reply deletion results in deleting the lowest reply until refresh

Detection of what inputs changed on post edit (do not reupload the same image!)

OnCreating a post make date like '1 hour ago' etc..

_STANDBY SOLUTIONS_

Redirect to previous page he was on if refresh token expired and he was redirected to login and actually logged back

See wtf is this
works => useGetPostsQuery([null], { refetchOnMountOrArgChange: true })
doesn't work => useGetPostsQuery([], { refetchOnMountOrArgChange: true })
neither this => useGetPostsQuery((null || undefined), { refetchOnMountOrArgChange: true })
