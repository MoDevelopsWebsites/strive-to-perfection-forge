import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProductsSection = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'S2P ALTERNATE JERSEY 2025',
      price: '39.99 €',
      image: '/lovable-uploads/6c6abcc5-cdb4-419a-9113-483835517d96.png',
      isNew: true,
      isCustomizable: true,
    },
    {
      id: 2,
      name: 'S2P 2025 SLEEVES',
      price: '29.99 €',
      image: '/lovable-uploads/217da5cf-f539-4bd2-9e98-da82d4ae1c1e.png',
      isNew: true,
    },
    {
      id: 3,
      name: 'S2P 2025 TRADING CARDS',
      price: '5.99 €',
      image: '/lovable-uploads/866683c9-6ba6-488d-93ed-5b444e83f6e6.png',
      isNew: true,
      isSoldOut: true,
    },
    {
      id: 4,
      name: 'S2P 2025 JACKET',
      price: '69.99 €',
      image: '/lovable-uploads/ab937607-6d1b-46b4-88b5-0eb8849ed32f.png',
      isNew: true,
    },
    {
      id: 5,
      name: 'S2P HOODIE 2025',
      price: '59.99 €',
      image: '/lovable-uploads/1e954a14-b815-4254-94ed-9762e2ad8379.png',
      isNew: true,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white" id="products">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            S2P'S NEW PRODUCTS
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gray-50 hover:bg-white"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-yellow-400 text-black font-bold px-2 py-1 text-xs">
                        NEW
                      </Badge>
                    )}
                    {product.isCustomizable && (
                      <Badge className="bg-blue-600 text-white font-bold px-2 py-1 text-xs">
                        CUSTOMIZABLE
                      </Badge>
                    )}
                  </div>

                  {/* Sold Out Overlay */}
                  {product.isSoldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-gray-800 text-white px-4 py-2 font-bold text-sm uppercase tracking-wider">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 mb-2 uppercase tracking-wide line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    {product.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline"
            className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 font-bold uppercase tracking-wider transition-all duration-300"
            onClick={() => navigate('/shop')}
          >
            VIEW ALL
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;