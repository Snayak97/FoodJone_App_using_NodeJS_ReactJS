import { useEffect, useState } from "react";

// import './App.css'
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [looding, setLoodind] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [filterData,setFilterData] = useState(null)
  const [selBtn,setSelBtn] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoodind(true);
      try {
        const response = await fetch(BASE_URL);
        const js = await response.json();
        setData(js);
        setFilterData(js)
        setLoodind(false);
      } catch (error) {
        setErr("data not fething");
      }
    };
    fetchFoodData();
  }, []);

  const filterFood=(type)=>{
    if (type === "all"){
      setFilterData(data)
      setSelBtn("all")
      return;
    }
    const fdata=data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(fdata)
    setSelBtn(type)

  }

  const serchFood=(e)=>{
    const searchValue= e.target.value;
    if (searchValue ===""){
      setFilterData(null)
    }
    const fdata=data?.filter((food)=>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(fdata)

  }

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];



  
  if (err) return <div>{err}</div>;
  if (looding) return <div>looding...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input type="text" placeholder="Search food"
            onChange={serchFood}
             />
          </div>
        </TopContainer>

        <FilterContainer>
          {/* <Button onClick={()=>filterFood("all")}>All</Button>
          <Button onClick={()=>filterFood("Breakfast")}>Breakfast</Button>
          <Button onClick={()=>filterFood("Lunch")}>Lunch</Button>
          <Button onClick={()=>filterFood("Dinner")}>Dinner</Button> */}
          {
            filterBtns.map((value)=>(
              <Button
              isSelectted={selBtn == value.type}
              onClick={()=>filterFood(value.type)}
              key={value.name}>{value.name}</Button>

            ))
          }
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
}

export default App;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 14px;
  align-items: center;
  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      border-radius: 5px;
      color: white;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  background-color:${({isSelectted})=>(isSelectted ? "#cb0e0e" : "#ff4343")} ;
  outline: 1px solid ${({ isSelectted }) => (isSelectted ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
  &:hover{
    background-color: #cb0e0e;
  }
`;
