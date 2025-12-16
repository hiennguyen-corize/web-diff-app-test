
if [ $# -ne 2 ]; then
    echo "Usage: $0 <image-name> <container-name>"
    exit 1
fi

IMAGE_NAME=$1
CONTAINER_NAME=$2

echo "Building Docker image..."
docker build \
    --build-arg STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY \
    --build-arg FIREBASE_CLIENT_MAIL=$FIREBASE_CLIENT_MAIL \
    --build-arg STRIPE_SUBSCRIPTION_PRICING_TABLE_ID=$STRIPE_SUBSCRIPTION_PRICING_TABLE_ID \
    --build-arg STRIPE_ADD_ONS_PRICING_TABLE_ID=$STRIPE_ADD_ONS_PRICING_TABLE_ID \
    --build-arg FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID \
    --build-arg FIREBASE_API_KEY=$FIREBASE_API_KEY \
    --build-arg FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN \
    --build-arg FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET \
    --build-arg FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID \
    --build-arg FIREBASE_APP_ID=$FIREBASE_APP_ID \
    --build-arg PRODUCTION_CLOUD_FC_REGION=$PRODUCTION_CLOUD_FC_REGION \
    --build-arg ENV=$ENV \
    -t $IMAGE_NAME .

echo "Running container..."
docker run --name $CONTAINER_NAME -d $IMAGE_NAME

echo "Copying dist directory to host..."
docker cp $CONTAINER_NAME:/app/dist ./dist

echo "Cleaning up..."
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME
docker rmi $IMAGE_NAME

echo "Done!"
