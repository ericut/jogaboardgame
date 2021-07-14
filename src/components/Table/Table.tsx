import { ReactNode } from "react";
import {
  Flex,
  Box,
  HStack,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";

// interfaces
interface ITableColumnProps extends BoxProps {
  w?: string;
  children: ReactNode;
}

export function Table({ children, ...rest }) {
  return (
    <Box w="100%" {...rest}>
      {children}
    </Box>
  );
}

export function THeader({ children, ...rest }) {
  const TextColor = useColorModeValue("gray.400", "gray.400");
  return (
    <Flex
      color={TextColor}
      minH="38px"
      fontSize="11px"
      textTransform="uppercase"
      style={{ zIndex: 1 }}
      fontWeight="bold"
      letterSpacing="1px"
      flexDirection={{ md: "initial", sm: "column" }}
      alignItems={{ md: "center", sm: "flex-start" }}
      justifyContent={{ md: "initial", sm: "flex-start" }}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function THead({ children, w, ...rest }) {
  return (
    <Box p="0px 10px" w={{ md: w ? w : "100%", sm: "100%" }} {...rest}>
      {children}
    </Box>
  );
}

export function THeadButtons({ children, w, ...rest }) {
  return (
    <Flex
      display={{ md: "flex", sm: "none" }}
      p="0 10px"
      justifyContent={{ md: "center", sm: "flex-start" }}
      w={{ md: w ? w : "100%", sm: "100%" }}
      {...rest}
    >
      <Box textAlign="center">{children}</Box>
    </Flex>
  );
}

export function TBody({ children, ...rest }) {
  const BorderColor = useColorModeValue("gray.400", "gray.600");
  return (
    <Box
      borderBottom="2px solid"
      borderTop="2px solid"
      borderTopColor={BorderColor}
      borderBottomColor={BorderColor}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function TRow({ children, ...rest }) {
  const BorderColor = useColorModeValue("gray.400", "gray.600");
  const HoverBgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex
      borderBottom="1px solid"
      borderBottomColor={BorderColor}
      minH="40px"
      fontSize="14px"
      transition="0.5s all"
      padding="10px 0"
      flexDirection={{ md: "initial", sm: "column" }}
      alignItems={{ md: "stretch", sm: "flex-start" }}
      justifyContent={{ md: "initial", sm: "flex-start" }}
      _hover={{
        backgroundColor: HoverBgColor,
      }}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function TColumn({ children, w, ...rest }: ITableColumnProps) {
  return (
    <Flex
      p="0 10px"
      w={{ md: w ? w : "100%", sm: "100%" }}
      _hover={{ color: "primary.900" }}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function TColumnButtons({ children, w, ...rest }: ITableColumnProps) {
  return (
    <HStack
      p="0 10px"
      alignItems="stretch"
      justifyContent={{ md: "center", sm: "flex-start" }}
      w={{ md: w ? w : "100%", sm: "100%" }}
      {...rest}
    >
      {children}
    </HStack>
  );
}
