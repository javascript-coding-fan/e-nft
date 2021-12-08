
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; //@ts-ignore
import logo from '../../assets/logo.png'; //@ts-ignore
import share from '../../assets/share-icon.png'
import './permalink.scss'
import axios from 'axios'
import { fetchNFT } from "../../services/api";

const API_URL = 'http://localhost:8080/api'

const Permalinked = ({ match }: { match: any }) => {
	const dispatch = useDispatch()

	const displayName = match.params.displayname

	const [isLoading, setIsLoading] = useState(true);
	const [nfts, setNfts] = useState<any>([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetchNFT(displayName);
			setNfts(res.data as any);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return (
		<>
			<div className="header" style={{ display: "flex", alignItems: "center" }}>
				<img src={logo} className="logo" alt="logo" />
				<span className="header-address">{nfts.contractAddress} / {nfts.tokenId}</span>
			</div>
			<div className="container-client">
				<img src={nfts.imgUrl} />
				<h3>{match.params.displayname} # {nfts.tokenId}</h3>
			</div>
			<div className="share-btn">
				<img src={share} alt="share" />
			</div>
		</>
	)
}

export default Permalinked;
