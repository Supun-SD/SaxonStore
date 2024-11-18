import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function PopUpModel({ children, title, button }) {
  return (
    <Dialog>
      <DialogTrigger>{button}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PopUpModel;
