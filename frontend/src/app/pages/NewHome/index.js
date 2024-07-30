import React, { useEffect, useState, useContext } from 'react';
import apis from '../../api';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import images from '../../utils/images';
import PersonalizedRecommendations from '../Components/PersonalizedRecommendations';
import { Link } from 'react-router-dom';
import UserContext from '../../utils/UserContext'

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
		{
			url: images.homeSlide5,
			caption: {
				title: 'COLT PYTHON .357MAG 6" SS',
				subtitle: 'ADJ SIGHT WALNUT GREEN FO',
				price: "$1275"
			}
		},
		{
			url: images.homeSlide6,
			caption: {
				title: 'MARLIN 1895 TRAPPER 45-70',
				subtitle: '16.5" S/S LAMINATED LARGE LOOP',
				price: "$992"
			}
		},
		{
			url: images.homeSlide7,
			caption: {
				title: 'KEL-TEC RDB BULLPUP 5.56MM',
				subtitle: '17.3" BLACK 20RD',
				price: "$851.95"
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
					<div key={index} className={'slide-item slide-item-' + index}>
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
	return (
		<div className='card'>
			<div className='category-container'>
				<div className='category-card-header'>
					<h2>{props.title}</h2>
				</div>
				{/* <div className='category-card-body'>
					<div className='card-row'>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[0]._id}>
								<div>
									<img src={props.products[0].isZander ? props.products[0].imagelink : "https://www.lipseyscloud.com/images/" + props.products[0].imageName} />
								</div>
								<div>
									<span>{props.products[0].isZander ? props.products[0].desc1 : props.products[0].description1}</span>
								</div>
							</Link>
						</div>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[1]._id}>
								<div>
									<img src={props.products[1].isZander ? props.products[1].imagelink : "https://www.lipseyscloud.com/images/" + props.products[1].imageName} />
								</div>
								<div>
									<span>{props.products[1].isZander ? props.products[1].desc1 : props.products[1].description1}</span>
								</div>
							</Link>
						</div>
					</div>
					<div className='card-row'>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[2]._id}>
								<div>
									<img src={props.products[2].isZander ? props.products[2].imagelink : "https://www.lipseyscloud.com/images/" + props.products[2].imageName} />
								</div>
								<div>
									<span>{props.products[2].isZander ? props.products[2].desc1 : props.products[2].description1}</span>
								</div>
							</Link>
						</div>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[3]._id}>
								<div>
									<img src={props.products[3].isZander ? props.products[3].imagelink : "https://www.lipseyscloud.com/images/" + props.products[3].imageName} />
								</div>
								<div>
									<span>{props.products[3].isZander ? props.products[3].desc1 : props.products[3].description1}</span>
								</div>
							</Link>
						</div>
					</div>
				</div> */}
				<div className='category-card-footer'>
					<Link to={"/search/" + props.category}>
						<span>See more</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

const TopSeller = (props) => {
	return <div className='card'>
		<div className='category-container'>
			<div className='category-card-header'>
				<h2>Top Sellers</h2>
			</div>
			<div className='category-card-body'>
				{
					props.products.length >= 2 && <div className='card-row'>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[0]._id}>
								<div>
									<img src={props.products[0].imagelink ? props.products[0].imagelink : "https://www.lipseyscloud.com/images/" + props.products[0].imageName} />
								</div>
								<div>
									<span>{props.products[0].desc1 ? props.products[0].desc1 : props.products[0].description1}</span>
								</div>
							</Link>
						</div>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[1]._id}>
								<div>
									<img src={props.products[1].imagelink ? props.products[1].imagelink : "https://www.lipseyscloud.com/images/" + props.products[1].imageName} />
								</div>
								<div>
									<span>{props.products[1].desc1 ? props.products[1].desc1 : props.products[1].description1}</span>
								</div>
							</Link>
						</div>
					</div>
				}
				{
					props.products.length >= 4  && <div className='card-row'>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[2]._id}>
								<div>
									<img src={props.products[2].imagelink ? props.products[2].imagelink : "https://www.lipseyscloud.com/images/" + props.products[2].imageName} />
								</div>
								<div>
									<span>{props.products[2].desc1 ? props.products[2].desc1 : props.products[2].description1}</span>
								</div>
							</Link>
						</div>
						<div className='card-row-column'>
							<Link to={"/product/" + props.products[3]._id}>
								<div>
									<img src={props.products[3].imagelink ? props.products[3].imagelink : "https://www.lipseyscloud.com/images/" + props.products[3].imageName} />
								</div>
								<div>
									<span>{props.products[3].desc1 ? props.products[3].desc1 : props.products[3].description1}</span>
								</div>
							</Link>
						</div>
					</div>
				}
			</div>
			<div className='category-card-footer'>
				<Link to={"/search/top-seller"}>
					<span>See more</span>
				</Link>
			</div>
		</div>
	</div>
}

const Home = () => {
	const { setSpinning } = useContext(UserContext);
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [slideProducts, setSlideProducts] = useState([]);
	const [topProducts, setTopProducts] = useState([]);

	useEffect(async () => {
		setSpinning(true)
		const res = await apis.getProductsByCategory();
		setCategoryProducts(res.data.result);
		setTopProducts(res.data.products)		
		setSpinning(false)
	}, []);
	if(categoryProducts[1])
	console.log(categoryProducts[1].products[0]._id);

	return (
		<section className='new-home'>
			<Slider products={slideProducts} />
			{
				categoryProducts.length > 0 && <>
					<div className='categories'>
						<TopSeller products={topProducts} />
						{
							categoryProducts.map(cp => {
								return cp.products.length !== 0 && <CategoryProduct key={cp.category.value} products={cp.products} title={cp.category.label} category={cp.category.value} />
							})
						}
					</div>
					<PersonalizedRecommendations />
				</>
			}
		</section>
	);
}

export default Home;