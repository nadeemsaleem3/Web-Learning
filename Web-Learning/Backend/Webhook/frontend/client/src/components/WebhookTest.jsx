const WebhookTest = () => {
  const testWebhook = async () => {
    const response = await fetch("http://localhost:5000/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "test_event", data: { id: 1, name: "Test" } }),
    });
    const result = await response.text();
    console.log(result);
  };

  return (
    <div>
      <button onClick={testWebhook}>Send Test Webhook</button>
    </div>
  );
};

export default WebhookTest;