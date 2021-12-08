import './animation.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { PrivateRoute } from './components/AuthenticatedRoute'
import CreateAuction from './pages/createAuction'
import Auctions from './pages/auctions/auctions'
import Auction from './pages/auction'
class RouterComp extends React.Component<{}, { hasError: boolean }> {
	static getDerivedStateFromError() {
		return { hasError: true }
	}

	constructor(props) {
		super(props)

		this.state = { hasError: false }
	}

	componentDidCatch() {
		setTimeout(() => {
			this.setState({ hasError: false })
		}, 2000)
	}

	render() {
		if (this.state.hasError) return <div>Working...</div>

		return (
			<Switch>
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
					className="switch-wrapper"
				>
					<Route path="/" component={React.lazy(() => import('./pages/index'))} exact />
					<Route path="/login" component={React.lazy(() => import('./pages/login'))} />


					{/* Permalink */}
					<Route path="/permalink-admin" component={React.lazy(() => import('./pages/permalink/admin'))} />
					<Route path="/addnfts" component={React.lazy(() => import('./pages/permalink/list'))} />
					<Route path="/nftlist/:route/:displayname" component={React.lazy(() => import('./pages/permalink/permalinked'))} />

					{/* Auction page Route */}
					{/* <Route path="/auction/:id" component={React.lazy(() => import('./pages/auction'))} /> */}
					<PrivateRoute path="/auction/:id" component={Auction} />
					{/* <Route path="/auctions" component={React.lazy(() => import('./pages/auctions/auctions'))} /> */}
					<PrivateRoute path="/auctions" component={Auctions} />
					<PrivateRoute path="/create-auction" component={CreateAuction} />
					{/* <Route path="/create-auction" component={React.lazy(() => import('./pages/createAuction'))} /> */}
					<Route path="/finished-auction/:id" component={React.lazy(() => import('./pages/finished-auction'))} />
					{/* Admin Routes */}
					<Route path="/admin/thefeeds" component={React.lazy(() => import('./pages/admin/thefeeds'))} />
					<Route path="/admin/feeds" component={React.lazy(() => import('./pages/admin/feeds'))} />
					<Route path="/admin/users" component={React.lazy(() => import('./pages/admin/users'))} />
					<Route path="/admin" component={React.lazy(() => import('./pages/admin/index'))} />

					{/* Auth Routes */}
					<Route path="/auth/oauth/facebook" component={React.lazy(() => import('./pages/auth/oauth/facebook'))} />
					<Route path="/auth/oauth/github" component={React.lazy(() => import('./pages/auth/oauth/github'))} />
					<Route path="/auth/oauth/google" component={React.lazy(() => import('./pages/auth/oauth/google'))} />
					<Route path="/auth/oauth/linkedin" component={React.lazy(() => import('./pages/auth/oauth/linkedin'))} />
					<Route path="/auth/confirm" component={React.lazy(() => import('./pages/auth/confirm'))} />
					<Route path="/auth/forgotpassword" component={React.lazy(() => import('./pages/auth/forgotpassword'))} />
					<Route path="/auth/magiclink" component={React.lazy(() => import('./pages/auth/magiclink'))} />
					<Route path="/:id" component={React.lazy(() => import('./pages/feed'))} />

					{/* Post Routes */}
					<Route path="/post/:pid" component={React.lazy(() => import('./pages/post/[pid]'))} />

					<Route path="/activity" component={React.lazy(() => import('./pages/activity'))} />
					<Route path="/feed" component={React.lazy(() => import('./pages/feed'))} />
					<Route path="/login" component={React.lazy(() => import('./pages/login'))} />
					<Route path="/messages" component={React.lazy(() => import('./pages/messages'))} />

					<Route path="/:pid" component={React.lazy(() => import('./pages/[pid]'))} />

					<Route path="*" component={React.lazy(() => import('./pages/404'))} />
				</AnimatedSwitch>
			</Switch>
		)
	}
}

export default RouterComp
