#/bin/sh

gcloud compute instances create bizbuzim \
    --project=bizbuzim-c552c \
    --zone=us-central1-a \
    --machine-type=e2-small \
    --network-interface=network-tier=PREMIUM,subnet=default \
    --metadata=startup-script=echo\ \"hello\" \
    --no-restart-on-failure \
    --maintenance-policy=TERMINATE \
    --preemptible \
    --service-account=1037676335443-compute@developer.gserviceaccount.com \
    --scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append \
    --create-disk=auto-delete=yes,boot=yes,device-name=bizbuzim,image=projects/cos-cloud/global/images/cos-85-13310-1453-1,mode=rw,size=10,type=projects/bizbuzim-c552c/zones/us-central1-a/diskTypes/pd-balanced \
    --no-shielded-secure-boot \
    --shielded-vtpm \
    --shielded-integrity-monitoring \
    --reservation-affinity=any
