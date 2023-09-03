import Axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Category(){
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
            const data =  res.data.filter( a=> a.subCategories.length === 0); //bu product eklerken kategori seçmek için
            setCategory(getUpperCategories(res.data))
            // console.log(res.data)
            //üzerlerinde recursive foreach çağır bir fonksiyonu iç içe sokarak. Yukarıda bir array olsun fonksiyon dışında.
            // [] ilk array'in içine gir.
        })
    },[])
    
    return (
        <Container>
            <Row>
        {category && category.map((data)=>{
            // return <h1 style={{display: "inline"}}>{data.name}</h1>
            return <Cards {...data}/>
        })}
            </Row>
        </Container>
    );
}

function Cards(props){
    const bingo = ()=>{
        alert('Erik Tech') //burada link ile alt kategorilere gidecek farklı bir componente de.
    }

    return(
        <Col>
            <Card onClick={bingo}> 
                <Card.Body>
                    <Card.Title>
                         <div>{props.name}</div>
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}