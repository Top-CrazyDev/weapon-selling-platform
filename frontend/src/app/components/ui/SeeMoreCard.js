import { useHistory  } from 'react-router-dom';

const ProductCard = (props) => {
    const history = useHistory();

    const goToDetail = () => {
        history.push("/search/" + props.category)
    }

    return (
        <div className='product-card-container'>
            <div className='seemore-card' onClick={goToDetail}>
                <div className='seemore-image'>
                    <div>More {props.title}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;