import HeroSection from '../Components/HeroSection.jsx'
// import FilterProducts from '../Components/Product.jsx'
import CategoryGrid from '../Components/Categories.jsx'
import FashionSaleSection from '../Components/FashionSaleSection.jsx'
import ProductGrid from '../Components/Product_grid.jsx'
import Why_Choose_Us from '../Components/Why_Choose_Us.jsx'
import Testimonial from '../Components/Testimonial.jsx'
import Customer_Support from '../Components/Customer_Support.jsx'
const Home = () => {
 

  return (
   <>
   <HeroSection />
   {/* <FilterProducts /> */}
   <CategoryGrid />
   <FashionSaleSection />
   <ProductGrid />
   <Why_Choose_Us />
   <Testimonial />
   <Customer_Support />
   </>
  );
};

export default Home;
