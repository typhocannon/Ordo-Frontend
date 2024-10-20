import { Button } from "@chakra-ui/react";
import { useState } from "react";

type ToggleButtonProps = {
  name: string;
  setList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ToggleButton({ name, setList }: ToggleButtonProps) {
  const [clicked, setClicked] = useState(false);

    function handleRemoveClick() {
        setClicked(false);
        setList((prevList) => prevList.filter((item) => item !== name));
    }

    function handleAddClick() {
        setClicked(true);
        setList((prevList) => [...prevList, name]);
    }

  return clicked ? (
    <Button
      rounded="lg"
      size="xs"
      bg="#104490"
      onClick={() => handleRemoveClick()}
    >
      {name}
    </Button>
  ) : (
    <Button
      rounded="lg"
      size="xs"
      bg="#0082FF"
      onClick={() => handleAddClick()}
    >
      {name}
    </Button>
  );
}
