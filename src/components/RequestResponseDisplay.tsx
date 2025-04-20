
import { Card } from "@/components/ui/card";

interface RequestResponseDisplayProps {
  request: Record<string, number> | null;
  response: { minimum_cost: number } | null;
}

const RequestResponseDisplay: React.FC<RequestResponseDisplayProps> = ({
  request,
  response,
}) => {
  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2)
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: ([0-9]+)/g, ': <span class="json-value">$1</span>')
      .replace(/\{/g, '<span class="json-bracket">{</span>')
      .replace(/\}/g, '<span class="json-bracket">}</span>');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-2xl mx-auto">
      {request && Object.keys(request).length > 0 && (
        <Card className="p-4 bg-card border-border overflow-hidden">
          <h3 className="text-lg font-bold mb-2">Request Body:</h3>
          <pre className="bg-black/30 p-4 rounded-md overflow-x-auto text-sm">
            <span
              dangerouslySetInnerHTML={{
                __html: formatJson(request),
              }}
            />
          </pre>
        </Card>
      )}

      {response && (
        <Card className="p-4 bg-card border-border overflow-hidden">
          <h3 className="text-lg font-bold mb-2">Response:</h3>
          <pre className="bg-black/30 p-4 rounded-md overflow-x-auto text-sm">
            <span
              dangerouslySetInnerHTML={{
                __html: formatJson(response),
              }}
            />
          </pre>
        </Card>
      )}
    </div>
  );
};

export default RequestResponseDisplay;
