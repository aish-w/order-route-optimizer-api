
import { useState } from "react";
import OrderForm from "@/components/OrderForm";
import RequestResponseDisplay from "@/components/RequestResponseDisplay";
import { submitOrder } from "@/services/optimizerService";
import { toast } from "sonner";

const Index = () => {
  const [request, setRequest] = useState<Record<string, number> | null>(null);
  const [response, setResponse] = useState<{ minimum_cost: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (order: Record<string, number>) => {
    try {
      setIsLoading(true);
      setRequest(order);
      
      // Check if order is empty
      if (Object.keys(order).length === 0) {
        toast.error("Please add at least one product to your order");
        return;
      }
      
      const result = await submitOrder(order);
      setResponse(result);
      
      // Show toast with result
      toast.success(`Calculation complete: Minimum cost is ${result.minimum_cost}`);
    } catch (error) {
      console.error("Error calculating cost:", error);
      toast.error("Failed to calculate minimum cost");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-white">POST</span>{" "}
            <span className="text-primary">/calculate-cost</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Calculate the minimum delivery cost for an order.
          </p>
        </div>

        <OrderForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        <RequestResponseDisplay request={request} response={response} />
        
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">About This API</h2>
          <p className="mb-4">
            This API calculates the minimum cost to deliver products from three different warehouse 
            centers (C1, C2, C3) to a customer location (L1), following specific routing and cost constraints.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Test Case Examples:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>A-1, G-1, H-1, I-3 → Output: 86</li>
            <li>A-1, B-1, C-1, G-1, H-1, I-1 → Output: 118</li>
            <li>A-1, B-1, C-1 → Output: 78</li>
            <li>A-1, B-1, C-1, D-1 → Output: 168</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
