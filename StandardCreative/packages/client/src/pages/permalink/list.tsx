import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NftData } from '../../store/state.types';
import { getNftData } from '../../services/api';
import Header from './header';
import './permalink.scss'
import { get_nftList } from '../../store/actions';
import { selectNfts } from '../../store/selector';

const NftList = ({ match }: { match: any }) => {
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(true);
	const [nfts, setNfts] = useState([]);

	const getList = useSelector(selectNfts)


	useEffect(() => {
		const fetchData = async () => {
			const data = await getNftData();
			dispatch(get_nftList(data))
			setNfts(data);
			setIsLoading(false);
		}

		fetchData();
	}, []);

	return (
		<>
			<Header />
			<div className="gallery-client">
				{!isLoading &&
					nfts.map((data: NftData) => {
						return (
							<div key={data.id} className="gallery-item">
								<Link to={`/nftlist/${data.route}/${data.displayName}`}>
									<div className="home-gallery">
										<img src={data.imgUrl} />
									</div>
									<div className="gallery-title">
										<p>{data.displayName}</p>
									</div>
								</Link>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default NftList