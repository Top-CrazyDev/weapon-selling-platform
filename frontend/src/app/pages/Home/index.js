import React, { useEffect, useState } from 'react';
import ZanderCard from '../../components/ui/ZanderCard';
import LipseyCard from '../../components/ui/LipseyCard';
import SeeMoreCard from '../../components/ui/SeeMoreCard';
import apis from '../../api';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import images from '../../utils/images';
import PersonalizedRecommendations from '../Components/PersonalizedRecommendations';

const Slider = () => {
	const slideImages = [
		{
			url: images.homeSlide1,
			caption: {
				title: 'KRISS VECTOR SDP-E G2 9MM 6.5" ',
				subtitle: "THREADED W/RAIL 40RD ALPINE",
				price: "$1161.50"
			}
		},
		{
			url: images.homeSlide2,
			caption: {
				title: "ZASTAVA ZPAP85 PISTOL 5.56*45",
				subtitle: "30RD BLUED/WOOD BOOSTER RAILS",
				price: "$939.95"
			}
		},
		{
			url: images.homeSlide3,
			caption: {
				title: "BLACK RAIN SPEC+ FUSION RIFLE",
				subtitle: '5.56 16" TIFFANY BLUE 30RD',
				price: "$1086.95"
			}
		},
		{
			url: images.homeSlide4,
			caption: {
				title: 'WALTHER PPQ M2 Q5 SF MATCH PRO',
				subtitle: '9MM 5" 17-SHOT BLACK',
				price: "$1329.95"
			}
		},
	];

	return (
		<div className="slide-container" style={{
			maxWidth: '1440px',
			margin: '0 auto'
		}}>
			<Slide autoplay={true} duration={2500} pauseOnHover={true} >
				{slideImages.map((slideImage, index) => (
					<div key={index} className='slide-item'>
						<div className='caption'>
							<div style={{ fontSize: '28px', fontWeight: '700' }}>{slideImage.caption.title}</div>
							<div style={{ fontSize: '26px', marginTop: '10px' }}>{slideImage.caption.subtitle}</div>
							<div style={{ fontSize: '24px', marginTop: '20px', color: '#febd69', fontWeight: '600' }}>{slideImage.caption.price}</div>
						</div>
						<div className='image'>
							<img src={slideImage.url.src} style={{maxWidth: '100%', maxHeight: '100%'}} />
						</div>
					</div>
				))}
			</Slide>
		</div>
	)
}

const CategoryProduct = (props) => {
	const productList = {
		margin: '40px auto 40px auto',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignItems: 'stretch'
	}

	return (
		<div className='category-container' style={{maxWidth: '1440px', margin: '40px auto'}}>
			<div className='category-title'>
				<span style={{borderBottom: '2px solid #fff', paddingBottom: '3px'}}>
					{props.title}
				</span>
			</div>
			<div className='product-list' style={productList}>
				{
					props.products.map((p, index) => {
						return p.isZander && <ZanderCard key={p._id} product={p} />
						
					})
				}
				{
					props.products.map((p, index) => {
						return p.isLipsey && <LipseyCard key={p._id} product={p} />
						
					})
				}
				<SeeMoreCard category={props.category} title={props.title} />
			</div>
		</div>
	);
}

const Home = () => {
	const [categoryProducts, setCategoryProducts] = useState([]);

	useEffect(async () => {
		const res = await apis.getProductsByCategory();
		setCategoryProducts(res.data.result)
	}, []);

	return (
		<section className='home'>
			<Slider />
			{
				categoryProducts.map(cp => {
					return cp.products.length !== 0 && <CategoryProduct key={cp.category.value} products={cp.products} title={cp.category.label} category={cp.category.value} />
				})
			}
			<PersonalizedRecommendations />
		</section>
	);
}

export default Home;