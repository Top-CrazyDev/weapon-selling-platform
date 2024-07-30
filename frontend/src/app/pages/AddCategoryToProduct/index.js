import React, { useEffect, useState } from 'react'
import apis from '../../api';

const AddCategoryToProduct = () => {
    useEffect(() => {
        const addCategoryToProduct = async () => {
            await apis.addCategoryToProduct({});
        }

        addCategoryToProduct();
    }, []);

    return (
        <div className='product-detail'>
            Add Category to Product
        </div>
    );
}

export default AddCategoryToProduct;