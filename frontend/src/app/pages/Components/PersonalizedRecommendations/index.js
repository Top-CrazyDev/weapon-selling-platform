import React from "react"
import { useHistory, Link } from "react-router-dom"

const PersonalizedRecommendations = () => {
	const history = useHistory()

	const personalizedRecommendations = {
		backgroundColor: '#fff',
		width: '100%',
		padding: '20px 0'
	}

	const border = {
		border: '1px solid #DDD',
		borderRadius: '5px',
		textAlign: 'center',
		padding: '20px 0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}

	const signInBtn = {
		cursor: 'pointer',
		backgroundPosition: 'right -170px',
		display: 'block',
		height: '28px',
		position: 'relative',
		color: '#000',
		fontSize: '12px',
		lineHeight: '28px',
		textAlign: 'center',
		fontWeight: '700',
		textDecoration: 'none',
		textShadow: '0 1px 0 #ffe093',
		width: '200px',
		borderRadius: '2px',
		marginTop: '10px',
		marginBottom: '10px'
	}

	const goToSignin = () => {
		history.push("/login")
	}

	return (
		<div className='personalized-recommendations' style={personalizedRecommendations}>
			<div style={border}>
				<div>
					See personalized recommendations
				</div>
				<div className='btn-primary' style={signInBtn} onClick={goToSignin}>
					Sign in
				</div>
				<div>
					New customer? <Link to="/customer-register">Start here</Link>
				</div>
			</div>
		</div>
	);
}

export default PersonalizedRecommendations;