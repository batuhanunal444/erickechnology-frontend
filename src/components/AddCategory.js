import {useForm} from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row'
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col'
export default function AddCategory(){
    const [subCategories, setSubCategories] = useState([])
    const {register, handleSubmit} = useForm();
    useEffect(()=>{
        axios.get("http://localhost:8080/api/categories").then(res=>{
            const data =  res.data.filter( a=> a.subCategories.length === 0);
            setSubCategories(data)
        })
    })
    const onSubmit = (data) => {
        let payload;
        if(data.topCategory){
            payload = {
                name : data.categoryName
            }
        }else{
            payload = {
                name : data.categoryName,
                category: {
                    id : data.categoryId
                }
            }
        }
        axios.post('http://localhost:8080/api/categories',
        payload);
    }

    return (
        <Container>
        <Row className="justify-content-md-center">
            <Col md="8">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
            <Form.Label>Category Name</Form.Label>
             <Form.Control type="text" placeholder="Category Name" {...register("categoryName")}/>
            <label>Choose a parent category:</label>
            <Form.Select {...register("categoryId")}>
                <option value="" selected disabled hidden>Choose here</option>
                {subCategories && subCategories.map(subCategory=>{
                    return  <option value={subCategory.id}>{subCategory.name}</option>
                })}
            </Form.Select>
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Top Category?"
                {...register("topCategory")}/>
            <br/>
            <Button type="submit">Add Category</Button>
            </Form.Group>
        </Form>
        </Col>
        </Row>
        </Container>
    );
}