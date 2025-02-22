import React from 'react'
import {
    Box,
    Flex,
    Heading,
    HStack,
    Tab,
    TabIndicator,
    TabList,
    Tabs,
    Text
} from '@chakra-ui/react'
import { User } from '../../services/appConfig'
import { DiscoutData, SubscriptionTier, SubscriptionType } from '../../types/subscription.type'
import { PricingCard } from './PricingCard'

type FreeComponentProps = {
    currentSubscription: User["subscriptionData"];
    discountData?: DiscoutData
    userEmail: string;
}

export const FreeComponent = ({ currentSubscription, discountData, userEmail }: FreeComponentProps) => {
    const [subscriptionTier, setSubscriptionTier] = React.useState<SubscriptionTier>('MONTHLY');

    const isCurrentPlan = React.useCallback((type: SubscriptionType) => {
        return currentSubscription?.name === type;
    }, [currentSubscription]);

    const onChangeTier = React.useCallback(
        (tier: number) => {
            if (tier === 0) {
                setSubscriptionTier('MONTHLY');
            } else {
                setSubscriptionTier('YEARLY');
            }
        }, []
    );

    return (
        <Box>
            <Flex justify="center" mb={12}>
                <Flex
                    direction="column"
                    align="center"
                    maxW="xl"
                >
                    <Heading mb={5}>
                        Pricing
                    </Heading>
                    <Text textAlign="center" color="gray.600" fontSize="xl" mb={6}>
                        WebWhiz is free and open source, but you can choose the cloud-based solution where we handle everything from hosting to support.
                    </Text>
                    <Flex pos="relative">
                        <Tabs
                            variant="unstyled"
                            onChange={(index) => onChangeTier(index)}
                        >
                            <TabList
                                bg="blue.50"
                                h="38px"
                                borderRadius="96px"
                                alignItems="center"
                                justifyContent="center"
                                width="252px"
                            >
                                <Tab
                                    fontSize="sm"
                                    px={3}
                                    lineHeight={1}
                                    _selected={{ zIndex: 2 }}
                                    _focus={{ outline: "none" }}
                                >
                                    Monthly
                                </Tab>
                                <Tab
                                    px={3}
                                    _selected={{ zIndex: 2 }}
                                    lineHeight={1}
                                    _focus={{ outline: "none" }}
                                >
                                    <Flex align="baseline">
                                        <Text fontSize="sm" mr={1}>
                                            Annually
                                        </Text>
                                        <Text fontSize="xs" color="blue.500" fontWeight="400">
                                            2 months free
                                        </Text>
                                    </Flex>
                                </Tab>
                            </TabList>
                            <TabIndicator
                                height="28px"
                                bg="white"
                                shadow="sm"
                                transform="translateY(-50%)"
                                top="50%"
                                borderRadius="96px"
                            />
                        </Tabs>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>
                <HStack w="100%" spacing={4}>
                    <PricingCard
                        tier={subscriptionTier}
                        subscriptionData={{
                            type: 'Base',
                            pageCount: 100,
                            tokenSize: '4M',
                            projectCount: 5
                        }}
                        discountData={discountData}
                        isCurrentSubscription={isCurrentPlan('Base')}
                        userEmail={userEmail}
                    />
                    <PricingCard
                        tier={subscriptionTier}
                        subscriptionData={{
                            type: 'Standard',
                            pageCount: 1000,
                            tokenSize: '10M',
                            projectCount: 10
                        }}
                        discountData={discountData}
                        isCurrentSubscription={isCurrentPlan('Standard')}
                        userEmail={userEmail}
                    />
                    <PricingCard
                        tier={subscriptionTier}
                        subscriptionData={{
                            type: 'Premium',
                            pageCount: 2500,
                            tokenSize: '25M',
                            projectCount: 100
                        }}
                        discountData={discountData}
                        isCurrentSubscription={isCurrentPlan('Premium')}
                        userEmail={userEmail}
                        isPopular
                    />
                    <PricingCard
                        tier={subscriptionTier}
                        subscriptionData={{
                            type: 'Enterprise',
                            pageCount: 10000,
                            tokenSize: 'unlimited',
                            projectCount: 'unlimited'
                        }}
                        discountData={discountData}
                        isCurrentSubscription={isCurrentPlan('Enterprise')}
                        userEmail={userEmail}
                    />
                </HStack>
            </Flex>
            <Flex
                mt={8}
                mb={20}
                w="100%"
                justifyContent="center"
            >
                <Flex>
                    {
                        discountData?.couponCode ?
                            <Box
                                border="2px"
                                borderColor="blue.500"
                                borderRadius="xl"
                                px={6}
                                py={5}
                                color="blue.500"
                            >
                                {discountData?.countryFlag} Special Pricing for {discountData?.country
                                } - {discountData?.discountPercentage}% off on all annual plans
                            </Box> : null
                    }
                </Flex>
            </Flex>
        </Box >
    )
}