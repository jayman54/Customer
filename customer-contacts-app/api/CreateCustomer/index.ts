import { app } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONN_STRING!);
const container = client.database("customerdb").container("customers");

export async function CreateCustomer(request: app.HttpRequest, context: app.InvocationContext): Promise<app.HttpResponse> {
  try {
    const customer = await request.json();
    await container.items.create(customer);
    return { status: 201, jsonBody: { id: customer.id } };
  } catch (err) {
    context.error(err);
    return { status: 500, body: "Failed to create customer" };
  }
}
app.http("CreateCustomer", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: CreateCustomer,
});