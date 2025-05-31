import Button from "../ui/button/Button";
import Input from "../ui/form/InputField";
import Label from "../ui/form/Label";
import Select from "../ui/form/Select";
import TextArea from "../ui/form/TextArea";
import { Modal } from "../ui/modal/Modal";

interface CommonModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: T;
  fields: {
    key: keyof T;
    label: string;
    type: "text" | "select" | "textarea";
    options?: { value: string; label: string }[];
  }[];
  onChange: (key: keyof T, value: string) => void;
  onRegister: () => void;
}

function CommonModal<T>({
  isOpen,
  onClose,
  title,
  data,
  fields,
  onChange,
  onRegister,
}: CommonModalProps<T>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-xl">
      <div className="p-6">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h4>
        </div>
        <div className="grid gap-3">
          {fields.map((field) => (
            <div key={String(field.key)} className="col-span-2">
              <Label htmlFor={String(field.key)}>{field.label}</Label>
              {field.type === "text" && (
                <Input
                  type="text"
                  id={String(field.key)}
                  value={data[field.key] as string}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              )}
              {field.type === "textarea" && (
                <TextArea
                  id={String(field.key)}
                  value={data[field.key] as string}
                  onChange={(value) => onChange(field.key, value)}
                />
              )}
              {field.type === "select" && field.options && (
                <Select
                  options={field.options}
                  placeholder="선택하세요"
                  onChange={(value) => onChange(field.key, value)}
                  defaultValue={data[field.key] as string}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={onRegister} className="w-full">
            등록
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default CommonModal;
