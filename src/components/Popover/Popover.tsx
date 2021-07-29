import { ReactNode } from 'react';
// chakra
import {
  Text,
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
// icones
import { MdHelp } from 'react-icons/md';

interface IHelperPopoverProps {
  title: string;
  children: ReactNode;
}

const Popover = ({ title, children }: IHelperPopoverProps) => {
  return (
    <ChakraPopover placement="bottom">
      <PopoverTrigger>
        <Text fontSize="16px" px="10px" cursor="pointer" position="relative" color="blue.200">
          <MdHelp />
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">{title}</PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  );
};

export default Popover;
