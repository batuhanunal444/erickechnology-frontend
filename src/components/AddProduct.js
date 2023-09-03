import {useForm} from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/esm/Container";
export default function AddProduct(){
    const [subCategories, setSubCategories] = useState([])
    const {register, handleSubmit} = useForm();
    useEffect(()=>{
        axios.get("http://localhost:8080/api/categories").then(res=>{
            const data =  res.data.filter( a=> a.subCategories.length === 0);
            setSubCategories(data)
        })
    })
    const onSubmit = (data) => {
        const payload = {
            name : data.productName,
            details:data.productDetail,
            category: {
                id : data.categoryId
            }
        }
        console.log(payload)
        axios.post('http://localhost:8080/api/products',
        payload);
        
    }

    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
            <Form.Label>Product Name</Form.Label>
             <Form.Control type="text" placeholder="Product Name" {...register("productName")}/>
             <Form.Label>Product Detail</Form.Label>
             <Form.Control type="text" placeholder="Product Detail" {...register("productDetail")}/>
            <label for="cars">Choose a category:</label>
            <Form.Select {...register("categoryId")}>
                <option value="" selected disabled hidden>Choose here</option>
                {subCategories && subCategories.map(subCategory=>{
                    return  <option value={subCategory.id}>{subCategory.name}</option>
                })}
            </Form.Select>
            <input type="submit"/>
            </Form.Group>
        </Form>
        </Container>
    );
}