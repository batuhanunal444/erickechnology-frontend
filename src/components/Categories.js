import Axios from 'axios';
import { useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';

export default function Home(){
    function getUpperCategories(categories){
        const _categories = []
        categories.forEach(category=> {
            // console.log(category)
            let a = categories.find(_category => _category.subCategories.find(subCategory => category.name === subCategory.name))
            a && _categories.push(a)
        })
        console.log(_categories)
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
            console.log(res.data.subCategories)
        })
    })   
    //subcategory'si boşsa products componentine yönlendir.
    if(subCategory.length === 0){
        console.log("Bingo")
        return(
            <Container>
                <Row>
                    {products && products.map((data)=>{
                    return <ProductCards {...data}/>
                    })}
                </Row>
            </Container>
            // <h1>Batuhan</h1>
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