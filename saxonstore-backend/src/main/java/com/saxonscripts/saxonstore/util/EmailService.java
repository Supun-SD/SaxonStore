package com.saxonscripts.saxonstore.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String to, String token, String returnUrl) throws MessagingException {
        String resetLink = returnUrl + "?token=" + token;
        String subject = "Password Reset Request";
        // String text = "To reset your password, click the link below:\n" + resetLink;
        String template;
        String text = "";
        try {
            template = new String(Files.readAllBytes(Paths.get("src/main/resources/reset_password_email.html")), StandardCharsets.UTF_8);
            text = template.replace("{{{resetLink}}}", resetLink);
            String strippedName = to.substring(0, to.indexOf('@'));
            text = text.replace("{{{receiverEmail}}}", strippedName);
        } catch (IOException e) {
            e.printStackTrace();
            text = "<html><body>To reset your password, click the link below:<br><a href=\"" + resetLink + "\">Reset Password</a></body></html>";
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);
        mailSender.send(mimeMessage);
    }
}
