import React from 'react';
import { ElementType } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import { useAuthState } from '@standardcreative/client-core/src/user/state/AuthState'
import { useDispatch } from '@standardcreative/client-core/src/store'
type PrivateRouteProps = {
	component: ElementType
	path: string
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
	const userData = JSON.parse(localStorage.getItem("theoverlay-client-store-key-v1"))
	const isAuthenticated = userData ? userData.user.userRole : false
	return (
		<Route
			path={path}
			render={props => (isAuthenticated === 'admin' ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	)
}

export { PrivateRoute }
