import TabelWebHook from "@/components/ui/tabel-webhook";
import Modelwebhook from "@/components/ui/modal/Modalwebhook";

function WebhookPage() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhook</h1>
        </div>
        <div className="flex justify-end">
          <Modelwebhook />
        </div>
      </div>
      <TabelWebHook />
    </div>
  );
}

export default WebhookPage;
