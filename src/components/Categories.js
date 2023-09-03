import Axios from 'axios';
import { useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Home(){
    function getUpperCategories(categories){
        const _categories = []
        categories.forEach(category=> {
            let is_sub = categories.find(_category => _category.subCategories.find(subCategory => category.name === subCategory.name))
            !is_sub && _categories.push(category)
        })
        return(_categories)
    }
    const [category,setCategory] = useState([]);
    useEffect(()=>{
        Axios.get('http://localhost:8080/api/categories').then((res)=>{
            const data =  res.data.filter( a=> a.subCategories.length === 0); //product eklerken kullanılcak
            setCategory(getUpperCategories(res.data))
        })
    },[])
    
    return (
        <Container>
            <Row>
        {category && category.map((data)=>{
            return <CategoryCards {...data}/>
        })}
            </Row>
        </Container>
    );
}

function CategoryCards(props){
    const navigate = useNavigate();
    const bingo = (id) =>{
        navigate(`/categories/${id}`)
    }
    return(
        <Col>
            <Card onClick={()=>bingo(props.id)}> 
                <Card.Body>
                    <Card.Title>
                         <div>{props.name}</div>
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

function ProductCards(props){
    const navigate = useNavigate();
    const bingo = (id) => {
        navigate(`/products/${id}`)
    }

    return(
        <Col>
            <Card onClick={()=>bingo(props.id)} style={{backgroundColor:"cyan"}}> 
                <Card.Body>
                    <Card.Title>
                         <div>{props.name}</div>
                    </Card.Title>
                    <Card.Text>
                        <div>{props.details}</div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export function Categories(){
    const [subCategory,setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const params = useParams();
    useEffect(()=>{
        Axios.get(`http://localhost:8080/api/categories/${params.categoryId}`).then((res)=>{
            setCategory(res.data.subCategories)
            setProducts(res.data.products)
        })
    })   
    if(subCategory.length === 0){
        return(
            <Container>
                <Row>
                    {products && products.map((data)=>{
                    return <ProductCards {...data}/>
                    })}
                </Row>
            </Container>
        );
    }else{
        return (
            <Container>
                <Row>
                    {subCategory && subCategory.map((data)=>{
                    return <CategoryCards {...data}/>
                    })}
                </Row>
            </Container>
    );
    }
}

export function ProductDetail(){
    const params = useParams();
    const [product, setProduct] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/products/${params.productId}`).then(res=>{
            setProduct(res.data)
        })
    })
    return(
        <Container>
            <Row className="justify-content-md-center">
            <Card  style={{backgroundColor:"cyan", height: 300, width: 300}}> 
            <Card.Body>
                <Card.Title>
                     <div>{product.name}</div>
                </Card.Title>
                <Card.Text>
                    <div>{product.details}</div>
                </Card.Text>
            </Card.Body>
        </Card>
        </Row>
        </Container>
    ); 
}