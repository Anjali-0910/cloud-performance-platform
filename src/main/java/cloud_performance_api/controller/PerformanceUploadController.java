package cloud_performance_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/performance")
public class PerformanceUploadController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadReport(
            @RequestParam("file") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Report file is empty");
        }

        Path reportPath = Path.of("performance-reports/k6-summary.json");

        // Create the directory if it does not exist
        Files.createDirectories(reportPath.getParent());

        // Save the uploaded report
        Files.write(reportPath, file.getBytes());

        return ResponseEntity.ok(
                "Performance report saved: " + reportPath.toAbsolutePath()
        );
    }
}