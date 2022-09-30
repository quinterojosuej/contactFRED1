public with sharing class CallFREDAPI {
    
    @AuraEnabled
    public static string callFREDSeries(String seriesVal){
        try {
            Http htt = new Http();
            HttpRequest req = new HttpRequest();

            req.setEndpoint('callout:FRED_API/fred/series?series_id=' + seriesVal +'&api_key=YOUR_KEY_HERE&file_type=json');
            req.setMethod('GET');

            HttpResponse res = htt.send(req);

            System.debug(res.getBody());
            return res.getBody();

        } catch (Exception e) {
            // throw new AuraHandledException(e.getMessage());
            System.debug(e.getMessage());
            return e.getMessage();
        }

    }

    @AuraEnabled
    public static string callFREDSeriesObservations(String seriesVal){
        try {
            Http htt = new Http();
            HttpRequest req = new HttpRequest();

            req.setEndpoint('callout:FRED_API/fred/series/observations?series_id=' + seriesVal +'&api_key=YOUR_KEY_HERE&file_type=json');
            req.setMethod('GET');

            HttpResponse res = htt.send(req);

            System.debug(res.getBody());
            return res.getBody();

        } catch (Exception e) {
            // throw new AuraHandledException(e.getMessage());
            System.debug(e.getMessage());
            return e.getMessage();
        }
    }
}
