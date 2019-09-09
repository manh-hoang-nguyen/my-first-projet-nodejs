 
 exports.locationCompare=(location1,location2)=>{
      
   //console.log(location2);
  
    switch(location2.LocationType) {
        case 'Point': 
                const x=location2.Location_point01.X===location1.Location_point01.X;
                const y=location2.Location_point01.Y===location1.Location_point01.Y;
                const z=location2.Location_point01.Z===location1.Location_point01.Z;
                 
                if( x &y &z ) return true;
                else return false;
                
        case 'Curve':
            if( location2.Location_point01.X===location1.Location_point01.X
                &location2.Location_point01.Y===location1.Location_point01.Y
                &location2.Location_point01.Z===location1.Location_point01.Z
                &location2.Location_point02.X===location1.Location_point02.X
                &location2.Location_point02.Y===location1.Location_point02.Y
                &location2.Location_point02.Z===location1.Location_point02.Z
                ) return true;
                else return false;
        default:
          return true;
      }
}
exports.bBoxComparer=(bB1,bB2)=>{
    switch(bB1.status==='1'){
     case '1' :
           if( bB1.BoundingBox_point01.X===bB2.BoundingBox_point01.X
            &bB1.BoundingBox_point01.Y===bB2.BoundingBox_point01.Y
            &bB1.BoundingBox_point01.Z===bB2.BoundingBox_point01.Z
            &bB1.BoundingBox_point02.X===bB2.BoundingBox_point02.X
            &bB1.BoundingBox_point02.Y===bB2.BoundingBox_point02.Y
            &bB1.BoundingBox_point02.Z===bB2.BoundingBox_point02.Z
            ) return true;
            else return false;
    case '0': return true;
                   
        
    }
     
}
exports.centroidCompare=(cen1,cen2)=>{
    switch(cen1.status) {
        case '1':
                if( cen1.centroid.X===cen2.centroid.X
                    &cen1.centroid.Y===cen2.centroid.Y
                    &cen1.centroid.Z===cen2.centroid.Z
                    ) return true;
                    else return false;
        case '0': return true;
    }
   
}