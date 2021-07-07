for dir in ./*/
do
    dir=${dir%*/}
    echo "##########################################################"
    echo "Deploing functions in ${dir##*/}"
    echo "##########################################################"
    cd ${dir}
    chmod 777 create.sh
    ./create.sh
    chmod 777 update.sh
    ./update.sh
    chmod 777 triggers.sh
    ./triggers.sh
    cd ..
done