import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";
import api from "../services/api.ts";
import ContactFields from "./ContactFields.tsx";

export default function CustomerForm() {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      address: { street: "", city: "", state: "", zip: "" },
      contacts: [] as any[]
    }
  });
  const {
    fields: contactFields,
    append,
    remove
  } = useFieldArray({ name: "contacts", control });

  const onSubmit = async (data: any) => {
    // add IDs client‑side (optional)
    const payload = {
      id: uuid(),
      ...data,
      contacts: data.contacts.map((c: any) => ({ ...c, contactId: uuid() }))
    };
    await api.post("/CreateCustomer", payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
      <input {...register("name", { required: true })} placeholder="Customer Name" className="input" />
      {/* Address */}
      <div className="grid grid-cols-2 gap-2">
        <input {...register("address.street")} placeholder="Street" className="input" />
        <input {...register("address.city")} placeholder="City" className="input" />
        <input {...register("address.state")} placeholder="State" className="input" />
        <input {...register("address.zip")} placeholder="ZIP" className="input" />
      </div>

      {/* Contacts */}
      <h2 className="font-semibold">Contacts</h2>
      {contactFields.map((field, idx) => (
        <ContactFields key={field.id} index={idx} register={register} remove={() => remove(idx)} />
      ))}
      <button type="button" onClick={() => append({})} className="btn">+ Add Contact</button>

      <button type="submit" className="btn-primary">Save Customer</button>
    </form>
  );
}