export interface FeatureSet {
  results: [
    {
      paramName: string;
      dataType: string;
      value: {
        displayFieldName: string;
        geometryType: string;
        spatialReference: any;
        fields: any;
        features: [
          {
            attributes: any;
            geometry: {
              paths: [[number, number, number, number][]];
            };
          }
        ];
      };
    }
  ];
  messages: [];
}
