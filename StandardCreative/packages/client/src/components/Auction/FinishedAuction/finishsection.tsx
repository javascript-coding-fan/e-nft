import React, { useState } from 'react'
import BidHistory from './bidhistory'
import MultiBid from '../multibid'
import Time from '../time'
import RecordPanel from '../recordpanel'
import ControlPan from '../controlpan'
import '../style.scss'

const FinishSection = (props) => {
	const [isconnected, setIsconnected] = useState(false)
	const [issingle, setIssingle] = useState(false)
	const [switcheth, setSwitcheth] = useState(0)
	const handleconnect = (value) => {
		setIsconnected(value)
	}

	return (
		<div className="bid-container history-container">
			<BidHistory
				issingle={issingle}
				setIssingle={() => setIssingle(true)}
				isconnected={isconnected}
				handleswitch={(value) => setSwitcheth(value)}
			/>
		</div>
	)
}

export default FinishSection
