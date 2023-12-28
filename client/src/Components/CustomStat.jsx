import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";

const CustomStat = ({ label, value, imageLink }) => {
  const generateRandomPercentageChange = () => {
    const randomValue = (Math.random() - 0.5) * 10;
    return randomValue;
  };

  const val = generateRandomPercentageChange();

  return (
    <Stat
      p={4}
      mr={10}
      ml={10}
      borderRadius="lg"
      borderWidth="2px"
      boxShadow="xl"
      bg="white"
      width="50%"
      height={170}
    >
      <StatLabel fontSize="xl" fontWeight="bold" color="black">
        {label}
      </StatLabel>

      <Flex justifyContent="space-between" alignItems="center">
        <StatNumber fontSize="5xl" fontWeight="bold" color="teal">
          {value}
        </StatNumber>
        {imageLink && (
          <Image
            src={imageLink} // Replace with your image URL
            maxW="100%"
            h="auto"
            mt={-17}
            // Adjust margin as needed
          />
        )}
      </Flex>
      <StatHelpText>
        {val > 0.0 ? (
          <>
            <Flex>
              <StatArrow type="increase" boxSize={5} mt={1} />
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="black" // Change color as needed
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "5px", // Adjust the height of the stroke as needed
                  background: "teal.500", // Change color as needed
                  borderRadius: "4px", // Adjust the border-radius to make it rounded or remove it for a square stroke
                }}
              >{`${val.toFixed(2)}%`}</Text>
            </Flex>
          </>
        ) : (
          <>
            <Flex>
              <StatArrow type="decrease" boxSize={5} mt={1} />
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="black" // Change color as needed
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "5px", // Adjust the height of the stroke as needed
                  background: "red", // Change color as needed
                  borderRadius: "4px", // Adjust the border-radius to make it rounded or remove it for a square stroke
                }}
              >
                {`${val.toFixed(2)}%`}
              </Text>
            </Flex>
          </>
        )}
      </StatHelpText>
    </Stat>
  );
};

export default CustomStat;
