interface Props { index: number; register: any; remove: () => void; }
export default function ContactFields({ index, register, remove }: Props) {
  return (
    <div className="border p-2 rounded-xl space-y-2">
      <input {...register(`contacts.${index}.firstName`)} placeholder="First name" className="input" />
      <input {...register(`contacts.${index}.lastName`)} placeholder="Last name" className="input" />
      <input {...register(`contacts.${index}.email`)} placeholder="Email" className="input" />
      <input {...register(`contacts.${index}.phone`)} placeholder="Phone" className="input" />
      <button type="button" onClick={remove} className="text-sm text-red-600">Remove</button>
    </div>
  );
}