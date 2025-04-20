
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface OrderFormProps {
  onSubmit: (order: Record<string, number>) => void;
  isLoading: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading }) => {
  const productIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const [quantities, setQuantities] = useState<Record<string, number>>(
    productIds.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
  );

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out products with quantity 0
    const filteredOrder = Object.entries(quantities).reduce((acc, [key, value]) => {
      if (value > 0) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, number>);
    
    onSubmit(filteredOrder);
  };

  return (
    <Card className="p-6 bg-card border-border shadow-md w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {productIds.map((id) => (
            <div key={id} className="space-y-1">
              <Label htmlFor={`product-${id}`} className="text-sm font-medium">
                Product {id}
              </Label>
              <Input
                id={`product-${id}`}
                type="number"
                min="0"
                className="bg-secondary text-foreground"
                value={quantities[id] || ""}
                onChange={(e) => handleQuantityChange(id, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Calculate Minimum Cost"}
        </Button>
      </form>
    </Card>
  );
};

export default OrderForm;
