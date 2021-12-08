import React, { useState, useEffect } from "react";
import { ajax } from 'rxjs/ajax';
import { ethers } from 'ethers'
import ABI from "../../abi/erc721.json";
import Header from './header'
import './permalink.scss'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addnft } from "../../services/api";


// const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
let listener = window.ethereum
let walletProvider = new ethers.providers.Web3Provider(listener)
// const web3 = new Web3('https://mainnet.infura.io/v3/1835809e0e6a4de38eaf1f7afb51e0ec');
// const id = '7391';

export function replaceIpfs(url: string): string {
	let replacedUrl = url ? url : '';

	if (!url.includes('ipfs://') &&
		!url.includes('https://') &&
		!url.includes('http://')) {
		replacedUrl = url.replace('Q', 'https://infura-ipfs.io/ipfs/Q');
	}

	replacedUrl = replacedUrl
		.replace('ipfs://Q', 'https://infura-ipfs.io/ipfs/Q')
		.replace('ipfs://ipfs/', 'https://infura-ipfs.io/ipfs/')
		.replace('https://ipfs.io/ipfs/', 'https://infura-ipfs.io/ipfs/');
	return replacedUrl;
}

export const PermaAdmin = () => {

	const [metaDatas, setMetaDatas] = useState<any>([]);

	const dispatch = useDispatch();
	const [contractAddress, setContractAddress] = useState('0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D');
	const [tokenId, setTokenId] = useState('');
	const [route, setRoute] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [isSubmit, setIsSubmit] = useState(false);

	const [inputFormShow, setInputFormShow] = useState(false);
	const [resultFormShow, setResultFormShow] = useState(false);

	const handleClick = () => {
		setInputFormShow(true);
	}

	const inputFormClose = () => {
		setInputFormShow(false);
	}

	const resultFormClose = () => {
		setResultFormShow(false);
	}


	const handleSubmit = async () => {
		setIsSubmit(true)
		let arr: string[] = [];
		const NFTContract = new ethers.Contract(contractAddress, ABI, walletProvider.getSigner())
		NFTContract.tokenURI(parseInt(tokenId)).then((u: string) => {
			const url = replaceIpfs(u);
			ajax.getJSON(url).subscribe(
				res => {
					arr.push(res as string);
					setMetaDatas([...arr]);
				});
		});
		setResultFormShow(true);
	}
	useEffect(() => {
		const getImg = metaDatas[0] ? metaDatas[0].image : '';
		const imgUrl = replaceIpfs(getImg);
		console.log(imgUrl);
		if (isSubmit) {
			addnft(contractAddress, tokenId, route, displayName, imgUrl)
			setIsSubmit(false)
		}
	}, [metaDatas])

	return (
		<>
			<Header />
			<div className="container">
				<div className="addNFT-btn" onClick={handleClick}>
					<div className="round-btn">+</div>
					<div className="btn-name">ADD NFT</div>
				</div>
				{inputFormShow &&
					<div className="inputForm" >
						<div className="close-btn" onClick={inputFormClose}>+</div>
						<div className="form-item">
							<label>Contract Address</label><br />
							<input
								type="input"
								placeholder="0x123456789ABCD012345678EFG980778885"
								onChange={(e) => setContractAddress(e.target.value)}
								value={contractAddress}
							/>
						</div>
						<div className="form-item">
							<label>Token ID</label><br />
							<input
								type="input"
								placeholder="1234"
								onChange={(e) => setTokenId(e.target.value)}
							/>
						</div>
						<div className="form-item">
							<label>Custom Route</label><br />
							<input
								type="input"
								placeholder="example"
								onChange={(e) => setRoute(e.target.value)}
							/>
						</div>
						<div className="form-item">
							<label>Display Name</label><br />
							<input
								type="input"
								placeholder="Bored Ape #1234"
								onChange={(e) => setDisplayName(e.target.value)}
							/>
						</div>
						<div className="submit-btn" onClick={() => handleSubmit()}>SUBMIT</div>
					</div>
				}

				{resultFormShow &&
					<div className="inputForm result-panel">
						<div className="close-btn" onClick={resultFormClose}>+</div>
						<div className="form-item">
							<label>Contract Address</label><br />
							<p>{contractAddress}</p>
						</div>
						<div className="form-item">
							<label>Token ID</label><br />
							<p>{tokenId}</p>
						</div>
						<div className="form-item">
							<label>Custom Route</label><br />
							<p>/{route}/{displayName}</p>
						</div>

						<div>
							{metaDatas[0] &&
								<div>
									<img src={replaceIpfs(metaDatas[0].image)} />
									<span>{metaDatas[0].name}</span>
								</div>
							}
						</div>
					</div>
				}

			</div>

		</>
	)
}

export default PermaAdmin;
